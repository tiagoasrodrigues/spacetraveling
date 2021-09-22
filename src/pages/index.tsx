import { GetStaticProps } from 'next';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi'
import Header from '../components/Header';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  return (
    <>
      <main className={commonStyles.container}>
        <Header />

        <div className={styles.posts}>
          <Link href="/">
            <a className={styles.post}>
              <strong>Como ultilizar Hooks</strong>
              <p>Pensando em sincronização em vez de ciclos de vidas</p>
              <ul>
                <li>
                  <FiCalendar />
                  15 Mar 2021
                </li>
                <li>
                  <FiUser />
                  Tiago Augusto
                </li>
              </ul>
            </a>
          </Link>

          <Link href="/">
            <a className={styles.post}>
              <strong>Criando um app CRA do zero</strong>
              <p>Tudo sobre como criar a sua primeira aplicação utilizando Create React App</p>
              <ul>
                <li>
                  <FiCalendar />
                  19 Abr 2021
                </li>
                <li>
                  <FiUser />
                  Tiago Augusto
                </li>
              </ul>
            </a>
          </Link>
          <button type="button">
            Carregar mais posts
          </button>
        </div>
      </main>
    </>
  );
}

//export const getStaticProps: GetStaticProps = async () => {
//const prismic = getPrismicClient();
//
//  const postsResponse = await prismic.query([
//    Prismic.predicates.at('document.type', 'posts')
//  ], {
//    fetch: ['posts.title', 'posts.content'],
//    pageSize: 80,
//  });
//
//  const posts = response.results.map(post => {
//    return {
//      slug: post.uid,
//      title: RichText.asText(post.data.title),
//      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
//      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
//        day: '2-digit',
//        month: 'long',
//        year: 'numeric'
//
//      })
//    }
//  })
//
//  return {
//    props: {
//      posts
//    }
//  }
//};
