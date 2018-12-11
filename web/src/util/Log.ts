class Log {
  static active: boolean = true;

  public static log(message: any) {
    if (this.active) {
      console.log(message);
    }
  }
}

export {Log}
