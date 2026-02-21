import { useState } from 'react'

interface LogData {
  _id: string;
  userId: {
    _id: string;
    prefix: string;
    firstname: string;
    lastname: string;
  };
  request: {
    method: string;
    endpoint: string;
  };
  response: {
    statusCode: string;
    message: string;
    timeMs: number;
  };
  timestamp: string;
  labnumber: string[];
  action: string;
}

const mockLogs: LogData[] = [
  {
    _id: "6971a72fc5d5e37e272f5f75",
    userId: {
      _id: "6971178f323017deaeaaee87",
      prefix: "Mr.",
      firstname: "CHARLIE",
      lastname: "BROWN"
    },
    request: {
      method: "POST",
      endpoint: "/api/analyzer-request"
    },
    response: {
      statusCode: "500",
      message: "Failed to send analyzer request",
      timeMs: 37
    },
    timestamp: "2025-03-25T00:12:44.000Z",
    labnumber: ["L1482776", "L1799563", "L1533213", "L1533627", "L1539999"],
    action: "analyzerRequest"
  },
  {
    _id: "6971a730c5d5e37e272f633d",
    userId: {
      _id: "6971178f323017deaeaaee89",
      prefix: "Mr.",
      firstname: "DAVE",
      lastname: "MILLER"
    },
    request: {
      method: "POST",
      endpoint: "/api/analyzer-request"
    },
    response: {
      statusCode: "503",
      message: "Analyzer is offline",
      timeMs: 22
    },
    timestamp: "2025-04-26T20:06:38.000Z",
    labnumber: ["L1600915", "L1350775"],
    action: "analyzerRequest"
  },
  {
    _id: "6971a736c5d5e37e272f7805",
    userId: {
      _id: "6971178f323017deaeaaee8d",
      prefix: "Mr.",
      firstname: "FRANK",
      lastname: "WILSON"
    },
    request: {
      method: "POST",
      endpoint: "/api/analyzer-request"
    },
    response: {
      statusCode: "503",
      message: "Analyzer is offline",
      timeMs: 36
    },
    timestamp: "2025-10-29T23:59:09.000Z",
    labnumber: ["L1377889"],
    action: "analyzerRequest"
  },
  {
    _id: "6971a737c5d5e37e272f7a65",
    userId: {
      _id: "6971178f323017deaeaaee89",
      prefix: "Mr.",
      firstname: "DAVE",
      lastname: "MILLER"
    },
    request: {
      method: "POST",
      endpoint: "/api/analyzer-request"
    },
    response: {
      statusCode: "200",
      message: "Analyzer request sent successfully",
      timeMs: 37
    },
    timestamp: "2025-11-20T06:24:45.000Z",
    labnumber: ["L1180973", "L1931529", "L1108114"],
    action: "analyzerRequest"
  }
];

function LogTable() {
    return (
        <div className="max-w-9/10 overflow-x-auto bg-white rounded-[1vw] text-gray-700 shadow-md">
            <table className="min-w-full text-sm">
                <thead>
                    <tr className="text-left text-gray-700 border-b">
                        <th className="py-3 px-3">User</th>
                        <th className="py-3 px-3">Endpoint</th>
                        <th className="py-3 px-3">Method</th>
                        <th className="py-3 px-3">Timestamp</th>
                        <th className="py-3 px-3">Lab Number</th>
                        <th className="py-3 px-3">Action</th>
                        <th className="py-3 px-3">Status Code</th>
                        <th className="py-3 px-3">Message</th>
                        <th className="py-3 px-3">Time (ms)</th>
                    </tr>
                </thead>

                <tbody>
                    {mockLogs.map((log) => (
                        <tr key={log._id}>
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
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default LogTable