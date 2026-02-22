import LogSearchBar from "./LogSearchBar";
import LogTable from "./LogTable";
import { api } from '../services/api.service';
import type { LogData } from "../types/log";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import type { User } from "../types/user";


function LogDisplay() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [logs, setLogs] = useState<LogData[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const [users, setUsers] = useState<User[]>([]);
    
    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get<User[]>("/user/get-all-existing-users");

                if (response.data) {
                    setUsers(response.data);
                }
            } catch (err) {
                setError('Failed to fetch logs');
            }
        }

        fetchUsers();
    }, [])

    // Fetch log data
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                setLoading(true);
                const params = {
                    page: page
                }
                const response = await api.get<LogData[]>('/log/get-paginated-logs', params);
                
                if (response.data) {
                    setLogs(response.data);
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
    }, [page]);

    if (error) return <div>Error: {error}</div>;
    
    return (
        <div className="flex flex-col items-center justify-center min-w-screen min-h-screen">
            <LogSearchBar users={users}></LogSearchBar>
            <LogTable logs={logs} loading={loading}></LogTable>
            <Pagination page={page} totalPages={totalPages} span={5} onPageChange={setPage}></Pagination>
        </div>
    )
}

export default LogDisplay;