import LogSearchBar from "./LogSearchBar";
import LogTable from "./LogTable";
import { api } from '../services/api.service';
import type { LogData } from "../types/log";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import type { User } from "../types/user";
import { getDefaultEndDate, getDefaultStartDate } from "../services/date.service";


function LogDisplay() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [logs, setLogs] = useState<LogData[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const [users, setUsers] = useState<User[]>([]);

    const [actions, setActions] = useState<string[]>([]);
    const [startDate, setStateDate] = useState<Date>(getDefaultStartDate());
    const [endDate, setEndDate] = useState<Date>(getDefaultEndDate());
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [statusCode, setStatusCode] = useState<string>('');
    const [labnumber, setLabnumber] = useState<string>('');
    const [lowerResTime, setLowerResTime] = useState<number>(0);
    const [upperResTime, setUpperResTime] = useState<number>(0);
    
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
                const params: Record<string, string | number | boolean> = {
                    page: page,
                }

                if (actions) params.actions = actions.join(',');
                if (startDate) params.startDate = startDate.toISOString();
                if (endDate) params.endDate = endDate.toISOString();
                if (selectedUserIds.length > 0) params.userIds = selectedUserIds.join(',');
                if (statusCode) params.statusCodes = statusCode;
                if (labnumber) params.labnumbers = labnumber;
                if (lowerResTime) params.lowerResTime = lowerResTime;
                if (upperResTime) params.upperResTime = upperResTime;

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
    }, [page, actions, startDate, endDate, selectedUserIds, statusCode, labnumber, lowerResTime, upperResTime]);

    if (error) return <div>Error: {error}</div>;
    
    return (
        <div className="flex flex-col items-center justify-center min-w-screen min-h-screen">
            <LogSearchBar
                users={users}
                onActionsChange={setActions}
                onUsersChange={setSelectedUserIds}
                onStartDateChange={setStateDate}
                onEndDateChange={setEndDate}
                onStatusCodeChange={setStatusCode}
                onLabnumberChange={setLabnumber}
                onLowerResTimeChange={setLowerResTime}
                onUpperResTimeChange={setUpperResTime}
            ></LogSearchBar>
            <LogTable logs={logs} loading={loading}></LogTable>
            <Pagination page={page} totalPages={totalPages} span={5} onPageChange={setPage}></Pagination>
        </div>
    )
}

export default LogDisplay;