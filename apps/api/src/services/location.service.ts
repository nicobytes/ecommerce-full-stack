import { faker } from "@faker-js/faker";

function generateLocation(origin: { latitude: number; longitude: number }) {
  const [latitude, longitude] = faker.location.nearbyGPSCoordinate({
    origin: [origin.latitude, origin.longitude],
  });

  return {
    id: faker.number.int(),
    name: faker.location.streetAddress(),
    description: faker.lorem.sentence(),
    latitude,
    longitude,
  };
}

export const getAllLocations = (
  origin: { latitude: number; longitude: number },
  size = 15,
) => {
  const generatorFn = () => generateLocation(origin);
  return faker.helpers.multiple(generatorFn, {
    count: size,
  });
};
