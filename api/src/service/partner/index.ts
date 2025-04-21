import pg from "../../libs/prisma";
import { calculateDistanceInKm } from "../../utils/geolocation";
import { Create, Update, Remove, Get } from "./types";

export const create = async (args: Create.Args) => {
  const { ...data } = args;

  const partner = await pg.partner.create({
    data
  });
  return partner;
};

export const update = async (id: string, args: Update.Args) => {
  const { ...data } = args;
  const partner = await pg.partner.update({
    where: { id },
    data,
  });
  return partner;
};

export const remove = async (id: Remove.Args) => {
  await pg.partner.delete({
    where: { id },
  });
};

export const get = async (args: Get.Args) => {
  const { lat, lng, radius, search } = args;

  const partners = await pg.partner.findMany({
    where: {
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { city: { contains: search, mode: "insensitive" } },
          { address: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
  });

  // Se lat, lng e radius forem fornecidos, filtra os parceiros por distância
  if (lat && lng && radius) {
    const filteredPartners = partners
      .map(partner => {
        const distance = calculateDistanceInKm(lat, lng, partner.latitude, partner.longitude);
        return { ...partner, distance };
      })
      .filter(partner => partner.distance < radius);
    filteredPartners.sort((a, b) => a.distance - b.distance);

    return filteredPartners;
  }

  return partners;
};


export * as partnerService from ".";
