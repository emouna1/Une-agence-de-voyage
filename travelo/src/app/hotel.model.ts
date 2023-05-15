export class Hotel {
    id?: number;
    name?: string;
    address?: string;
    description?: string;
    country?: string;
    prixNuit?: string;
    email?: string;
    website?: string;
    image?: string
  
    constructor(data: any = {}) {
      this.id = data.id || undefined;
      this.name = data.name || '';
      this.address = data.address || '';
      this.description = data.description || '';
      this.country = data.country || '';
      this.prixNuit = data.prixNuit || '';
      this.image = data.image || '';
      this.email = data.email || '';
      this.website = data.website || '';
    }
  }
  