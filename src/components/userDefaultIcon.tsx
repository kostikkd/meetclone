type UserIconProps = {
    userName: string;
    color: string;
};

function UserIcon({ userName, color }: UserIconProps) {
    const nameParts = userName.split(" ");

    const initials =
        nameParts[0]?.[0] + (nameParts[1]?.[0] || "");

    return (
        <div
            style={{ backgroundColor: color }}
            className="w-full h-full rounded-full flex items-center justify-center"
        >
            <span className="text-sm text-gray-600 font-semibold">
                {initials.toUpperCase()}
            </span>
        </div>
    );
}

export default UserIcon;