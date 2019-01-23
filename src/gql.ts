import { apolloClient } from './apollo';
import gql from 'graphql-tag';

const fragments = {
  itemFields: gql`
    fragment itemFields on Item {
      itemId
      itemLink
      itemLabel
      itemDescription
      itemPrice
      itemImage
      categoryId
      isOpen
      isReserved
      reservedBy
    }
  `,
  categoryFields: gql`
    fragment categoryFields on Category {
      categoryLabel
      categoryId
    }
  `
};

const GET_ITEMS = gql`
  query {
    items {
      ...itemFields
    }
  }
  ${fragments.itemFields}
`;

export const queryItemsApollo = async () => {
  const { data } = await apolloClient.query({
    query: GET_ITEMS
  });
  return data;
};

const GET_CATEGORIES = gql`
  query {
    categories {
      ...categoryFields
    }
  }
  ${fragments.categoryFields}
`;

export const queryCategoriesApollo = async () => {
  const { data } = await apolloClient.query({
    query: GET_CATEGORIES
  });
  return data;
};

const UPDATE_ITEM = gql`
  mutation updateItem(
    $itemId: String!
    $reservedBy: String
    $isReserved: Boolean
  ) {
    updateItem(
      itemId: $itemId
      reservedBy: $reservedBy
      isReserved: $isReserved
    ) {
      ...itemFields
    }
  }
  ${fragments.itemFields}
`;

export const reserveItemApollo = async (itemId: string, reservedBy: string) => {
  const { data } = await apolloClient.mutate({
    refetchQueries: [
      {
        query: GET_ITEMS
      },
      {
        query: GET_CATEGORIES
      }
    ],
    mutation: UPDATE_ITEM,
    variables: {
      itemId,
      reservedBy,
      isReserved: true
    }
  });

  return data;
};
