export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <main className="grid all:(transition-all h-screen col-span-4 overflow-scroll)">
            {children}
        </main>
    );
}
