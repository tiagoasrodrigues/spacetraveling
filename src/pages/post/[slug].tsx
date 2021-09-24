import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  console.log(post);
  return (
    <>
      <Header />
      <img src="/banner.png" alt="imagem" className={styles.banner} />
      <main className={commonStyles.container}>
        <div className={styles.post}>
          <div className={styles.postTop}>
            <h1>Rocketseat é a melhor!</h1>
            <ul>
              <li>
                <FiCalendar />
                25 mar 2021
              </li>
              <li>
                <FiUser />
                Tiago Augusto
              </li>
              <li>
                <FiClock />
                25 min
              </li>
            </ul>
          </div>

          <article>
            <h2>Título seção</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              <strong>Aut error praesentium et</strong>. Aut laudantium et ex
              dignissimos culpa magni id, animi pariatur hic placeat excepturi
              fugiat dolor sapiente praesentium{' '}
              <a href="/">xpedita odit possimus iste vel</a> erepudiandae eaque
              sint accusantium est! Dicta temporibus eaque consectetur, autem
              suscipit inventore mollitia eligendi iure similique possimus
              ipsam, sunt dolorum corrupti officia odit exercitationem quisquam
              doloremque sed dolor voluptatem quasi? Odit debitis velit vitae
              ratione sapiente, optio amet? Modi minus dolores eos cupiditate
              laboriosam facere maiores.
            </p>
          </article>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query(TODO);

  return {
    paths: [],
    fallback: true,
  }
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const { slug } = context.params;
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner,
      },
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  };

  return {
    props: {
      post,
    },
  };
};
