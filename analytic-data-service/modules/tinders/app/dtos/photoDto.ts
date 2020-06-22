class PhotoProfile {
  url: string = "";
  width: number = -1;
  height: number = -1;
}

class PhotoDTO {
  url: string = "";
  id: number = -1;
  userId: BigInt = BigInt(-1);
  metadata: Array<PhotoProfile> = [];
}

export default PhotoDTO;
