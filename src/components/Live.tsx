function LiveTimer() {
    return (
        <div className="bg-gray-200 p-1 rounded-full flex items-center gap-1">
            <span className="px-2 text-2xl text-red-500">•</span>
            <span className="text-xs">Live</span>
            <span className="text-xs">•</span>
            <span className="text-xs pr-2">00:23</span>
        </div>
    );
}

export default LiveTimer;
