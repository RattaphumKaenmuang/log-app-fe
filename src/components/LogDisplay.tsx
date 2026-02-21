import LogSearchBar from "./LogSearchBar";
import LogTable from "./LogTable";
import { api } from '../services/api.service';
import type { LogData } from "../types/log";
import { useEffect, useState } from "react";

function LogDisplay() {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<LogData[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                setLoading(true);
                const response = await api.get<LogData[]>('/log/get-paginated-logs');
                
                if (response.data) {
                    setLogs(response.data);
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

    return (
        <div className="flex flex-col items-center justify-center min-w-screen min-h-screen">
            <LogSearchBar></LogSearchBar>
            <LogTable logs={logs} loading={loading}></LogTable>
        </div>
    )
}

export default LogDisplay;