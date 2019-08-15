export class Utils {
  /**
   * Get object index in array
   *
   * @param arr array to find
   * @param identifier identifier to look for in object
   * @param id id or value going to unique identify its posiiton
   */
  public static getObjPosInArray(arr: any[], identifier: string, id: string): number {
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][identifier] === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  public static isNull(i: any): boolean {
    return i === null || i === undefined || i === '';
  }

  public static isNotNull(i: any): boolean {
    return ! this.isNull(i);
  }
}
