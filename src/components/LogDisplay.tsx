import LogSearchBar from "./LogSearchBar";
import LogTable from "./LogTable";

function LogDisplay() {
    return (
        <div className="flex flex-col items-center justify-center min-w-screen min-h-screen">
            <LogSearchBar></LogSearchBar>
            <LogTable></LogTable>
        </div>
    )
}

export default LogDisplay;