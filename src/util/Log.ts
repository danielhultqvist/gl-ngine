class Log {
  static active: boolean = true;

  public static log(message: string) {
    if (this.active) {
      console.log(message);
    }
  }
}

export {Log}
