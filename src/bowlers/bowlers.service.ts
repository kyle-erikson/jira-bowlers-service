import { Inject, Injectable } from '@nestjs/common';
import { FlowModel, DefectAgeModel } from './bowlers.models';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';

@Injectable()
export class BowlersService {
  private urlBase = 'https://intelex.atlassian.net/rest/api/3/';
  private email = this.configService.get<string>('JIRA_EMAIL');
  private apiKey = this.configService.get<string>('JIRA_API_KEY');

  constructor(@Inject(ConfigService) private configService: ConfigService) {}

  async getFlow(sprint: string, teamSize: number): Promise<FlowModel> {
    let completedItems = 0;
    const report = await this.getSprintReport(sprint);

    for (const issue of report.issues) {
      if (issue.fields.status.name == 'Done') completedItems++;
    }

    return {
      amount: (completedItems / teamSize).toFixed(2),
    };
  }

  async getDefectBacklogAge(teachTeams: string[]): Promise<DefectAgeModel> {
    const teams = teachTeams.concat(', ');
    const defectJQL = `{"jql": "project = ILX AND issuetype = Defect 
    AND status NOT in ('Done', 'Will not Implement', 'No Fix required') 
    AND 'Tech Team' in ${teams}",
                     "maxResults": 100,
                     "fields": [
                       "status"
                     ],
                     "startAt": 0}`;
    const report = await this.makeJQLQuery(defectJQL);
    return {
        
    }(report.issues as Array<any>).length;
  }

  private async getSprintReport(sprint: string): Promise<any> {
    const sprintJQL = `{"jql": "Sprint = '${sprint}'",
                     "maxResults": 100,
                     "fields": [
                       "status"
                     ],
                     "startAt": 0}`;

    return this.makeJQLQuery(sprintJQL);
  }

  private async makeJQLQuery(query: string): Promise<any> {
    const config = {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${this.email}:${this.apiKey}`,
          'binary',
        ).toString('base64')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: query,
    };

    const result = await fetch(`${this.urlBase}search`, config).then();
    return await result.json();
  }
}
