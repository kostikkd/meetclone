function Container({ children }: { children: React.ReactNode }) {
    return <div className="container sm:w-md mx-auto">{children}</div>;
}

export default Container;
