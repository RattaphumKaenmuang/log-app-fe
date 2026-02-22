import LogSearchBar from "./LogSearchBar";
import LogTable from "./LogTable";
import { api } from '../services/api.service';
import type { LogData } from "../types/log";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";


function LogDisplay() {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<LogData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                setLoading(true);
                const response = await api.get<LogData[]>('/log/get-paginated-logs');
                
                if (response.data) {
                    setLogs(response.data);
                    setPage(response.pagination?.currentPage ?? 1)
                    setTotalPages(response.pagination?.total ?? 1)
                } else if (response.error) {
                    setError(response.error.message);
                }
            } catch (err) {
                setError('Failed to fetch logs');
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    if (error) return <div>Error: {error}</div>;
    
    return (
        <div className="flex flex-col items-center justify-center min-w-screen min-h-screen">
            <LogSearchBar></LogSearchBar>
            <LogTable logs={logs} loading={loading}></LogTable>
            <Pagination page={page} totalPages={totalPages} span={5} onPageChange={setPage}></Pagination>
        </div>
    )
}

export default LogDisplay;