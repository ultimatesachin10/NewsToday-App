import styles from '../styles/Feed.module.css';
import { useRouter } from 'next/router';

export const Feed = ({ articles, pageNumber }) => {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <h1 className={styles.title}><span>NewsToday</span> App</h1>
         <p className={styles.description}>Get the latest news from around the world</p>
         <br></br>
        {articles.map((article, index) => (
            <div key={index} className={styles.post}>
                <h1 onClick={() => (window.location.href = article.url)}>
                {article.title}</h1>
                <p>{article.description}</p>
                {!!article.urlToImage && <img onClick={() => (window.location.href = article.url)} src={article.urlToImage}/>}
                </div>
        ))}
      <div className={styles.paginator}>
        <div 
          className={pageNumber === 1 ? styles.disabled : styles.active}
          onClick={() => {
            if (pageNumber > 1) {
              router.push(`/${pageNumber - 1}`)
            }
          }}
        >
          Previous Page
        </div>
        <div>#{pageNumber}</div>
        <div
          className={pageNumber === 40 ? styles.disabled : styles.active}
          onClick={() => {
            if (pageNumber < 40) {
              router.push(`/${pageNumber + 1}`)
            }
          }}
        >
          Next Page
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.id;
 if (!pageNumber || pageNumber < 1 || pageNumber > 40) {
        return {
             props: {
                 articles: [],
                pageNumber: 1,
             },
         };
     }
const apiResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&us&category=business&entertainment&sports&pageSize=10`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
            },
        },
    );
    
    const json = await apiResponse.json();
    const { articles } = json;
return {
        props: {
            articles,
            pageNumber: Number.parseInt(pageNumber),
        },
    };
};
export default Feed;
