export const teamInvitationTemplate = (  inviteLink: string): string => {
      return `
<tr>
  <td align="center" style="padding:40px 0; background-color:#F4EFE7;">

    <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; border-radius:14px; overflow:hidden; box-shadow:0 4px 24px rgba(61,34,38,0.12);">

      <!-- Header -->
      <tr>
        <td style="background-color:#4B3932; padding:36px 40px 28px 40px;" align="center">

          <img
            src="cid:resolvehub-logo"
            width="72"
            height="72"
            alt="ResolveHub Logo"
            style="display:block; margin-bottom:18px;"
          />

          <h1 style="
              margin:0;
              color:#FFFFFF;
              font-size:28px;
              font-weight:700;
              letter-spacing:0.5px;
          ">
            ResolveHub
          </h1>

          <p style="
              margin:10px 0 0 0;
              color:#E9DED0;
              font-size:14px;
              line-height:22px;
          ">
            Enterprise Incident Management & War Room Collaboration
          </p>

        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:40px 40px 8px 40px;">

          <p style="
              margin:0 0 8px 0;
              font-size:15px;
              color:#4B3932;
              font-weight:600;
          ">
            Hello,
          </p>

          <p style="
              margin:0 0 22px 0;
              font-size:14.5px;
              line-height:24px;
              color:#5A4A4A;
          ">
            You've been invited to join a team in
            <strong>ResolveHub</strong>.
            Click the button below to accept your invitation and start collaborating with your team.
          </p>

        </td>
      </tr>

      <!-- CTA -->
      <tr>
        <td align="center" style="padding:0 40px 30px 40px;">

          <a
            href="${inviteLink}"
            style="
              display:inline-block;
              background:#4B3932;
              color:#FFFFFF;
              text-decoration:none;
              padding:14px 34px;
              border-radius:10px;
              font-size:15px;
              font-weight:600;
            "
          >
            Accept Invitation
          </a>

        </td>
      </tr>

      <!-- Invitation Details -->
      <tr>
        <td style="padding:0 40px 24px 40px;">

          <table
            role="presentation"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="
              background:#FBF6EC;
              border:1px solid #E8DCCB;
              border-radius:12px;
            "
          >
            <tr>
              <td style="padding:22px;">

                <div style="
                    font-size:12px;
                    color:#9C7B3F;
                    text-transform:uppercase;
                    letter-spacing:1px;
                    font-weight:600;
                    margin-bottom:10px;
                ">
                  Invitation Details
                </div>

                <p style="
                    margin:0;
                    color:#4B3932;
                    font-size:14px;
                    line-height:22px;
                ">
                  • You've been invited to join a ResolveHub team.
                </p>

                <p style="
                    margin:8px 0 0 0;
                    color:#4B3932;
                    font-size:14px;
                    line-height:22px;
                ">
                  • This invitation is valid for
                  <strong>7 days</strong>.
                </p>

              </td>
            </tr>
          </table>

        </td>
      </tr>

      <!-- Divider -->
      <tr>
        <td style="padding:0 40px;">
          <div style="border-top:1px solid #EFE7DA;"></div>
        </td>
      </tr>

      <!-- Security -->
      <tr>
        <td style="padding:20px 40px 8px 40px;">

          <p style="
              margin:0;
              font-size:12.5px;
              line-height:20px;
              color:#8A7A72;
          ">
            If you were not expecting this invitation, you can safely ignore this email. No action will be taken unless you accept the invitation.
          </p>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="
            background:#F7F2E9;
            padding:24px 40px;
            text-align:center;
        ">

          <div style="
              font-size:13px;
              font-weight:700;
              color:#4B3932;
              letter-spacing:0.4px;
          ">
            ResolveHub
          </div>

          <div style="
              font-size:11.5px;
              color:#B0A18F;
              margin-top:4px;
          ">
            Enterprise Incident Management & War Room Collaboration
          </div>

          <div style="
              font-size:11px;
              color:#C6BAA8;
              margin-top:12px;
          ">
            © 2026 ResolveHub. All rights reserved.
          </div>

        </td>
      </tr>

    </table>

  </td>
</tr>
`;
};