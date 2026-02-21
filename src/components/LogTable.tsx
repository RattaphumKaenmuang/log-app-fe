// import { useState } from 'react'
import { type LogData } from '../types/log'
import LogEntry from './LogEntry'

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
  },
  {
    _id: "6971a738c5d5e37e272f7b42",
    userId: {
      _id: "6971178f323017deaeaaee8f",
      prefix: "Ms.",
      firstname: "SARAH",
      lastname: "JOHNSON"
    },
    request: {
      method: "GET",
      endpoint: "/api/logs"
    },
    response: {
      statusCode: "200",
      message: "Logs retrieved successfully",
      timeMs: 18
    },
    timestamp: "2025-12-01T14:35:22.000Z",
    labnumber: ["L1425670", "L1842091", "L1556234"],
    action: "logRetrieval"
  }
];

function LogTable() {
    return (
        <div className="h-[60vh] max-w-[90vw] overflow-x-auto bg-white rounded-[1vw] text-gray-700 shadow-md">
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
                        <LogEntry log={log} ></LogEntry>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default LogTable