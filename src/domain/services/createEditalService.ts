
import Edital from "../entities/edital";
import { Sponsor } from "../entities/sponsor";
import RepositoryFactory from "../factories/RepositoryFactory";
import { SDG } from "../value-objects/SDGS";
import { Cause } from "../value-objects/causes";
import { Skill } from "../value-objects/skills";

export default class createEditalService {
    static async create({title, icon, description, funding_min, funding_max, sponsor, sdgs, causes, skills}: 
                  {title: string, icon: string, description: string, funding_min: number, funding_max: number, sponsor: Sponsor, sdgs: SDG[], causes: Cause[], skills: Skill[]}):
                  Promise<Edital> {
                    const edital = new Edital(
                        null,
                        title,
                        icon,
                        description,
                        funding_min,
                        funding_max,
                        sponsor,
                        sdgs,
                        causes,
                        skills
                    )

                    return await RepositoryFactory.getEditalRepository().save(edital)
                  }
}
