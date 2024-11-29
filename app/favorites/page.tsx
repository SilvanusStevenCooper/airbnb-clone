import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUsers";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const FavoriteListingsPage = async () => {
  const currentUser = await getCurrentUser();
  const favoriteListings = await getFavoriteListings();

  if (favoriteListings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Favorites yet"
          subtitle="You have not favorited any listing yet"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient
        favoriteListings={favoriteListings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default FavoriteListingsPage;
