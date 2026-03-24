import UserIcon from "./UserDefaultIcon";

type Props = {
    name: string;
    color: string;
};

function UserBlock({ name, color }: Props) {
    return (
        <div
            className="aspect-video bg-gray-200 border-2 border-gray-300 rounded-2xl flex items-center justify-center"
            style={{ width: "50%", maxWidth: "350px" }}
        >
            <div className="w-1/4 aspect-square">
                <UserIcon userName={name} color={color} />
            </div>
        </div>
    );
}

export default UserBlock;