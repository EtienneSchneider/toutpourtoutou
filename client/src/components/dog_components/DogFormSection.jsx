import "./DogFormSection.scss";

const DogFormSection = ({ title, children }) => {
    return (
        <section className="DogFormSection bg-white">
            <h2 className="subheadertext">{title}</h2>
            <div className="section-content">{children}</div>
        </section>
    );
};

export default DogFormSection;
