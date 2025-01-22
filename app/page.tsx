import getCurrentUser from "./actions/getCurrentUsers";
import getListings, { IListingsParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import Categories from "./components/Navbar/Categories";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  try {
    const listings = await getListings(searchParams);
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
      return (
        <ClientOnly>
          <EmptyState showReset />
        </ClientOnly>
      );
    }

    return (
      <ClientOnly>
        <Container>
          <div
            className="
            pt-28
            md:pt-36
            grid
            grid-cols-2
            md:grid-cols-4
            md:gap-8
            gap-4
          "
          >
            {listings.map((listing) => (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            ))}
          </div>
        </Container>
      </ClientOnly>
    );
  } catch (error) {
    console.error("Error rendering Home:", error);
    return (
      <ClientOnly>
        <EmptyState title="Error" subtitle="Something went wrong." />
      </ClientOnly>
    );
  }
};
export default Home;
