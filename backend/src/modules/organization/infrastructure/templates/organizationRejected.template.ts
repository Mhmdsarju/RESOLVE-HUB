export const organizationRejectedTemplate = (organizationName: string, rejectionReason: string,): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>ResolveHub - Verification Update</title>
</head>

<body style="margin:0; padding:0; background-color:#EDEAE3; font-family:'Segoe UI', Arial, sans-serif;">

  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
    Your ResolveHub organization verification requires some changes.
  </div>

  <table
    role="presentation"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="background-color:#EDEAE3; padding:32px 0;"
  >
    <tr>
      <td align="center">

        <table
          role="presentation"
          width="480"
          cellpadding="0"
          cellspacing="0"
          style="
            background-color:#FFFFFF;
            border-radius:14px;
            overflow:hidden;
            box-shadow:0 4px 24px rgba(61,34,38,0.12);
          "
        >

          <tr>
            <td
              style="
                background-color:#4B3932;
                padding:36px 40px 28px 40px;
              "
              align="center"
            >

              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <div
                      style="
                        display:inline-block;
                        padding:8px;
                        border:2px solid #F3E7D3;
                        border-radius:16px;
                        background-color:transparent;
                      "
                    >
                      <img
                        src="cid:resolvehub-logo"
                        alt="ResolveHub Logo"
                        width="72"
                        height="72"
                        style="
                          display:block;
                          border-radius:12px;
                        "
                      />
                    </div>
                  </td>
                </tr>
              </table>

              <div
                style="
                  margin-top:16px;
                  font-size:24px;
                  font-weight:700;
                  color:#F3E7D3;
                  letter-spacing:0.5px;
                "
              >
                ResolveHub
              </div>

              <div
                style="
                  margin-top:4px;
                  font-size:12.5px;
                  color:#D8C4A8;
                  letter-spacing:0.6px;
                  text-transform:uppercase;
                "
              >
                Respond Faster. Resolve Smarter.
              </div>

            </td>
          </tr>

          <tr>
            <td style="padding:40px 40px 8px 40px;">

              <div
                style="
                  width:56px;
                  height:56px;
                  line-height:56px;
                  text-align:center;
                  border-radius:16px;
                  background-color:#FEF0F0;
                  color:#C94A4A;
                  font-size:27px;
                  margin-bottom:20px;
                "
              >
                !
              </div>

              <p
                style="
                  margin:0 0 8px 0;
                  font-size:15px;
                  color:#4B3932;
                  font-weight:600;
                "
              >
                Verification Update
              </p>

              <h1
                style="
                  margin:0 0 16px 0;
                  font-size:25px;
                  line-height:34px;
                  color:#4B3932;
                "
              >
                Verification requires changes
              </h1>

              <p
                style="
                  margin:0;
                  font-size:14.5px;
                  line-height:22px;
                  color:#5A4A4A;
                "
              >
                Your organization
                <strong style="color:#4B3932;">
                  ${organizationName}
                </strong>
                was reviewed by the ResolveHub administration team and
                could not be approved at this time.
              </p>

            </td>
          </tr>

          <tr>
            <td style="padding:24px 40px;">

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
              >
                <tr>
                  <td
                    style="
                      background-color:#FEF5F5;
                      border:1px solid #F1D3D3;
                      border-radius:14px;
                      padding:20px;
                    "
                  >

                    <div
                      style="
                        font-size:12px;
                        letter-spacing:1px;
                        color:#B44A4A;
                        text-transform:uppercase;
                        font-weight:700;
                      "
                    >
                      Reason for rejection
                    </div>

                    <div
                      style="
                        margin-top:10px;
                        font-size:14px;
                        line-height:22px;
                        color:#713838;
                      "
                    >
                      ${rejectionReason}
                    </div>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 24px 40px;">

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
              >
                <tr>
                  <td
                    style="
                      background-color:#FBF6EC;
                      border:1px solid #E7DDD3;
                      border-radius:14px;
                      padding:20px;
                    "
                  >

                    <div
                      style="
                        font-size:12px;
                        letter-spacing:1px;
                        color:#9C7B3F;
                        text-transform:uppercase;
                        font-weight:600;
                      "
                    >
                      What to do next
                    </div>

                    <p
                      style="
                        margin:10px 0 0 0;
                        font-size:13.5px;
                        line-height:21px;
                        color:#6F6058;
                      "
                    >
                      Sign in to ResolveHub, update the required organization
                      information, and submit your organization again for
                      verification.
                    </p>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 24px 40px;">

              <p
                style="
                  margin:0;
                  font-size:13px;
                  line-height:20px;
                  color:#8A7A72;
                "
              >
                Your organization can be resubmitted after making the
                necessary changes. A new verification request will then be
                reviewed by our administration team.
              </p>

            </td>
          </tr>

          <tr>
            <td style="padding:0 40px;">

              <div style="border-top:1px solid #EFE7DA;"></div>

            </td>
          </tr>

          <tr>
            <td
              style="
                padding:20px 40px 24px 40px;
                text-align:center;
              "
            >

              <p
                style="
                  margin:0;
                  font-size:12.5px;
                  line-height:19px;
                  color:#A99A90;
                "
              >
                If you believe this decision was made in error, please
                contact your ResolveHub administrator.
              </p>

            </td>
          </tr>

          <tr>
            <td
              style="
                background-color:#F7F2E9;
                padding:24px 40px;
                text-align:center;
              "
            >

              <div
                style="
                  font-size:13px;
                  font-weight:700;
                  color:#4B3932;
                  letter-spacing:0.4px;
                "
              >
                ResolveHub
              </div>

              <div
                style="
                  font-size:11.5px;
                  color:#B0A18F;
                  margin-top:4px;
                "
              >
                Enterprise Incident Management &amp;
                War Room Collaboration
              </div>

              <div
                style="
                  font-size:11px;
                  color:#C6BAA8;
                  margin-top:12px;
                "
              >
                © 2026 ResolveHub. All rights reserved.
              </div>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};