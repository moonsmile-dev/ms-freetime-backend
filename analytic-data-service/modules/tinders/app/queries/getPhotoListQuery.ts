import { Query, QueryHandler } from "../../../../common/bus.ts";
import photo_repo from "../../domain/repositories/photo_repo.ts";
import { Where } from "../../../../deps.ts";
import PhotoDTO from "../dtos/photoDto.ts";
import { ListPaging } from "../../../../common/paging.ts";
import { PHOTO_STATUS_NORMAL } from "../../domain/contants.ts";

class GetPhotoListQuery extends Query {
  start: number = -1;
  end: number = -1;

  constructor(start: number = -1, end: number = -1) {
    super();
    this.start = start;
    this.end = end;
  }

  handler = () => GetPhotoListQueryHandler;
}

class GetPhotoListQueryHandler extends QueryHandler {
  handle = async (query: GetPhotoListQuery): Promise<ListPaging> => {
    const start = query.start;
    const end = query.end;

    const photos = await photo_repo.findAll(
      Where.expr(`status = ${PHOTO_STATUS_NORMAL}`),
    );

    const photoDtos: Array<PhotoDTO> = photos.slice(start, end).map((item) => {
      return {
        url: item.url ?? "",
        id: item.id ?? -1,
        userId: item.user_id ?? BigInt(-1),
      };
    });
    return new ListPaging(photoDtos, photos.length);
  };
}

export default GetPhotoListQuery;
