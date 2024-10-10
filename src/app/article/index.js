import { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector as useStoreRedux } from 'react-redux';
import { useParams } from 'react-router-dom';
import shallowequal from 'shallowequal';
import ArticleCard from '../../components/article-card';
import CommentsList from '../../components/comments-list';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import TopHead from '../../containers/top-head';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';

function Article() {
  const store = useStore();
  const {lang, t} = useTranslate();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [lang, params.id]);

  const selectRedux = useStoreRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.comments.data,
    waitingComments: state.comments.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const select = useSelector(state => ({
    exists: state.session.exists,
    user: state.session.user
  }))

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    addComment: useCallback((text, id) => {
      dispatch(commentsActions.add(text, id || params.id, id ? 'comment' : 'article'));
    }, [dispatch, params.id])
  }

  const mappedComments = useMemo(() => {
    return treeToList(
      listToTree([
        {
          _id: params.id,
          parent: null,
        },
        ...(selectRedux.comments.items || []),
      ]),
      (item, level) => ({ ...item, level: Math.max(0, level - 1) })
    ).slice(1);
  }, [selectRedux.comments.items]);

  return (
    <PageLayout key={lang}>
      <TopHead/>
      <Head title={selectRedux.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={selectRedux.waiting}>
        <ArticleCard article={selectRedux.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
      <Spinner active={selectRedux.waitingComments}>
        <CommentsList
          comments={mappedComments}
          onSubmit={callbacks.addComment}
          isUserAuth={select.exists}
          currentUser={select.user}
          pathToLogin={'/login'}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
