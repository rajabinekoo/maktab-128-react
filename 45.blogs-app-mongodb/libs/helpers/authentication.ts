import moment from "moment";
import { randomUUID } from "crypto";

class Authentication {
  private sessions: Record<string, moment.Moment> = {};

  public checkSession(token: string | null) {
    if (!token) return false;
    const exptime = this.sessions[token];
    if (!exptime) return false;
    const valid = moment().isBefore(exptime);
    if (!valid) delete this.sessions[token];
    return valid;
  }

  public createSession() {
    const token = randomUUID();
    const exptime = moment().add(
      Number(process.env.EXP_TIME_VALUE),
      <moment.DurationInputArg2>process.env.EXP_TIME_UNIT
    );
    this.sessions[token] = exptime;
    return token;
  }
}

export const authentication = new Authentication();
