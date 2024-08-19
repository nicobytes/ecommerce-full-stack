import { faker } from '@faker-js/faker';

function generateLocation() {
  const [latitude, longitude] = faker.location.nearbyGPSCoordinate({
    origin: [4.60971, -74.08175],
  });

  return {
    id: faker.number.int(),
    name: faker.location.streetAddress(),
    description: faker.lorem.sentence(),
    latitude,
    longitude,
  }
}

export const getAllLocations = () => {
  return faker.helpers.multiple(generateLocation, {
    count: 5,
  });
}
