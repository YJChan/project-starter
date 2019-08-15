export interface CustomerInterface{
  id?: string;
  name?: string;
  organization?: string;
  email?: string;
  contact?: string;
  unit?: string;
  streetName?: string;
  block?: string;
  postal?: string;
  city?: string;
  country?: string;
  organizationSize?: number;
  industry?: string;
  isActive?: number;
  createdBy?: string;
  updatedBy?: string;
}

export class Customer implements CustomerInterface{
  constructor(
    public id?: string,
    public name?: string,
    public organization?: string,
    public email?: string,
    public contact?: string,
    public unit?: string,
    public streetName?: string,
    public block?: string,
    public postal?: string,
    public city?: string,
    public country?: string,
    public organizationSize?: number,
    public industry?: string,
    public isActive?: number,
    public createdBy?: string,
    public updatedBy?: string
  ){
    this.id = '';
    this.name = '';
    this.organization = '';
    this.email = '';
    this.contact = '';
    this.unit = '';
    this.streetName = '';
    this.block = '';
    this.postal = '';
    this.city = '';
    this.country = '';
    this.organizationSize = 1;
    this.industry = '';
    this.isActive = 1;
    this.createdBy = '';
    this.updatedBy = '';
  }
}