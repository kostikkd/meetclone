type UserIconProps = {
    userName: string;
};

function UserIcon({ userName }: UserIconProps) {
    const name = userName.split(" ")
    return (
        <div className="bg-lime-200 w-full h-full rounded-full flex items-center justify-center">
            <span className="text-sm text-gray-600">
                {name[0][0] + (name[1][0] || "")}
            </span>
        </div>
    );
}

export default UserIcon;
