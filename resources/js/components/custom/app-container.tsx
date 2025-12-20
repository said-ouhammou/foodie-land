export default function AppContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main className="max-7xl px-[2%]">{children}</main>;
}
