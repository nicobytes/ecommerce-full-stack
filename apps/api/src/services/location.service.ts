import { faker } from "@faker-js/faker";

function generateLocation(
  origin: { latitude: number; longitude: number },
  radius: number,
) {
  const [latitude, longitude] = faker.location.nearbyGPSCoordinate({
    origin: [origin.latitude, origin.longitude],
    isMetric: true,
    radius,
  });

  return {
    id: faker.number.int(),
    name: faker.location.streetAddress(),
    description: faker.lorem.sentence(),
    latitude,
    longitude,
  };
}

export const generateLocations = (
  origin: { latitude: number; longitude: number },
  size = 15,
  radius = 10,
) => {
  const generatorFn = () => generateLocation(origin, radius);
  return faker.helpers.multiple(generatorFn, {
    count: size,
  });
};
