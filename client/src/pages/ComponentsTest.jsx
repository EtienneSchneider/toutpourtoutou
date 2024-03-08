import Button from "../components/Button";
import ProductPreview from "../components/ProductPreview";
import NavBar from "../components/NavBar";

const ComponentTest = () => {
    return (
        <div className="CompTest">
            <p>Test product preview</p>
            <ProductPreview
                title={"Friskies® Light"}
                desc="Croquettes allégées au poulet pour chien en surpoids"
                img_url={
                    "https://www.purina.fr/sites/default/files/styles/product_380x380/public/2022-01/1.%20MHI%2007613033831287_H1N1_FR_44074316-RESIZED.png?itok=cM3h0tUG"
                }
            />
            <p>Test custom link button</p>
            <Button text={"Profil complet"} link={"/articles"} arrow={true} />
            <form className="bg-white">
                <label>Test text field :</label>
                <input type="text" name="firstName" placeholder="yo" />

                <label>Test date field :</label>
                <input type="date" name="date" />
                <label>Test select field :</label>
                <select name="animal" id="animal">
                    <option value="chien">Chien</option>
                    <option value="chat">Chat</option>
                </select>
                <p>Test radio field :</p>
                <label htmlFor="male" className="radio-lab">
                    <input type="radio" id="male" name="sexe" value="male" />
                    Male
                </label>
                <label htmlFor="femelle" className="radio-lab">
                    <input
                        type="radio"
                        id="femelle"
                        name="sexe"
                        value="femelle"
                    />
                    Femelle
                </label>
                <button type="submit" className="Button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ComponentTest;
