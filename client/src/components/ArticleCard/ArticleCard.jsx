import "./ArticleCard.scss";

const ArticleCard = ({ article }) => {
    return (
        <div className="article">
            <div>
                <span className="tag">{article.tag}</span>
                <div >
                    <span className="article-content">{article.content}</span>
                </div>
            </div>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
                Lire
            </a>
        </div>
    );
};

export default ArticleCard;
