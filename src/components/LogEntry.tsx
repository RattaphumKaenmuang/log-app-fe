import { type LogData } from '../types/log'

interface LogEntryProps {
    log: LogData;
}

function LogEntry({ log }: LogEntryProps ) {
    return (
        <tr key={log._id} className="hover:bg-gray-50 relative after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:bg-gray-200">
            <td className="py-3 px-3">
                {log.userId.prefix} {log.userId.firstname} {log.userId.lastname}
            </td>
            <td className="py-3 px-3">{log.request.endpoint}</td>
            <td className="py-3 px-3">{log.request.method}</td>
            <td className="py-3 px-3">{new Date(log.timestamp).toLocaleString()}</td>
            <td className="py-3 px-3">{log.labnumber.join(", ")}</td>
            <td className="py-3 px-3">{log.action}</td>
            <td className="py-3 px-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                    log.response.statusCode === "200" 
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }`}>
                    {log.response.statusCode}
                </span>
            </td>
            <td className="py-3 px-3">{log.response.message}</td>
            <td className="py-3 px-3">{log.response.timeMs}</td>
        </tr>
    )
}

export default LogEntry;