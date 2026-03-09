function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto lg:w-2/5 sm:w-md">
            {children}
        </div>
    );
}

export default Container;