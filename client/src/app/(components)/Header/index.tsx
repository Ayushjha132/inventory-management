type HeaderProps = {
    name: string
}

export default function Header({ name }: HeaderProps) {
    return (
        <h1 className="text-2xl font-semibold text-gray-700">{name}</h1>
    )
}