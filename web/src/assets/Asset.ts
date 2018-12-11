class Asset {
  readonly id: string;
  readonly url: URL;

  constructor(id: string, url: URL) {
    this.id = id;
    this.url = url;
  }
}

export {Asset}
