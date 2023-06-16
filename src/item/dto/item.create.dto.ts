import { catelog_type } from "@prisma/client";
export default interface ICreateItemDto {
  price: string;
  description: string;
  catalog_type: catelog_type;
  status: string;
  owner_id: string;
  region: string;
  picture_url: string;
}
