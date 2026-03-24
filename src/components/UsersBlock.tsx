import UserBlock from "./UserBlock";

type User = {
    name: string;
    color: string;
};

type Props = {
    users: User[];
};

function UsersBlock({ users }: Props) {
    const renderRows = (rows: number) => {
        const cols = Math.ceil(users.length / rows);

        return (
            <div className="flex flex-col gap-3 w-full min-h-[calc(100vh-1002px) ">
                {Array.from({ length: rows }).map((_, rowIndex) => {
                    const start = rowIndex * cols;
                    const rowItems = users.slice(start, start + cols);

                    if (rowItems.length === 0) return null;

                    return (
                        <div
                            key={rowIndex}
                            className="flex gap-3 w-full justify-center"
                        >
                            {rowItems.map((user) => (
                                <UserBlock
                                    key={user.name}
                                    name={user.name}
                                    color={user.color}
                                />
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderUsers = () => {
        const count = users.length;

        if (count === 1) {
            return (
                <UserBlock
                    key={users[0].name}
                    name={users[0].name}
                    color={users[0].color}
                />
            );
        }

        if (count === 2) {
            return (
                <div className="flex gap-3 w-full justify-center">
                    {users.map((user) => (
                        <UserBlock
                            key={user.name}
                            name={user.name}
                            color={user.color}
                        />
                    ))}
                </div>
            );
        }

        if (count === 3) {
            return (
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex gap-3 justify-center">
                        {users.slice(0, 2).map((user) => (
                            <UserBlock
                                key={user.name}
                                name={user.name}
                                color={user.color}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <UserBlock
                            key={users[2].name}
                            name={users[2].name}
                            color={users[2].color}
                        />
                    </div>
                </div>
            );
        }

        if (count <= 6) return renderRows(2);
        if (count <= 12) return renderRows(3);

        return renderRows(4);
    };

    return (
        <div className="min-h-[calc(100vh-162px)] flex items-center justify-center p-3">
            {renderUsers()}
        </div>
    );
}

export default UsersBlock;