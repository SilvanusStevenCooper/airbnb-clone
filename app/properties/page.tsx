import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUsers";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  const properties = await getListings({
    userId: currentUser?.id,
  });

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    );
  }

  if (properties.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Listings Yet"
          subtitle="Looks like you haven't created any listing yet"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <PropertiesClient properties={properties} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
