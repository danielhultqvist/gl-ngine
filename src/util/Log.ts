class Log {
  static active: boolean = false;

  public static log(message: string) {
    if (this.active) {
      console.log(message);
    }
  }
}

export {Log}
