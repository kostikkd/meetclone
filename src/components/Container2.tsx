function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto lg:w-3/5 px-4 sm:w-md">
            {children}
        </div>
    );
}

export default Container;
