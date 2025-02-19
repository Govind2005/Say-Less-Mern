const MenuPage = () => {
    return (
        <div className="w-full h-screen">
            <object
                data="/MENU.pdf"
                type="application/pdf"
                className="w-full h-full"
            >
                <p>Your browser does not support PDFs.
                    <a href="/MENU.pdf" download>Download the PDF</a>
                </p>
            </object>
        </div>
    );
};

export default MenuPage; 