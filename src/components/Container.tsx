function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto lg:w-3/4 px-4">
            {children}
        </div>
    );
}

export default Container;