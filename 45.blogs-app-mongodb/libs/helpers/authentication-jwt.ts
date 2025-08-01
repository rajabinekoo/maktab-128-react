import moment from "moment";
import jwt from "jsonwebtoken";

class AuthenticationJWT {
  public checkSession(token: string | null) {
    if (!token) return false;
    token = token.replace(/^Bearer\s/g, "");
    try {
      const payload = <IPayload>(
        jwt.verify(token || "", <string>process.env.SECRET_KEY)
      );
      const exptime = moment(payload.exptime);
      return exptime.isAfter(moment());
    } catch {
      return false;
    }
  }

  public createSession() {
    const exptime = moment().add(
      Number(process.env.EXP_TIME_VALUE),
      <moment.DurationInputArg2>process.env.EXP_TIME_UNIT
    );
    return jwt.sign(
      <IPayload>{ exptime: exptime.toISOString() },
      <string>process.env.SECRET_KEY
    );
  }
}

export const authenticationJwt = new AuthenticationJWT();
