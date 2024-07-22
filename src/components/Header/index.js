import { TopNavigation, Input } from '@cloudscape-design/components';
import React from 'react';
import logo from '../../assets/img/logo_PTR 1.png';


const TopBar = () => {
  return (
    <div id='header' style={{position: 'sticky', zIndex: 1000, top: 0, left: 0, right: 0}}>
      <TopNavigation
        identity={{
          href: "#",
          title: "POS Admin",
          logo: {
            src: logo, // Use the imported logo here
            alt: "Service"
          }
        }}
        utilities={[
          {
            type: "button",
            iconName: "notification",
            title: "Notifications",
            ariaLabel: "Notifications (unread)",
            badge: true,
            disableUtilityCollapse: false
          },
          {
            type: "menu-dropdown",
            iconName: "settings",
            ariaLabel: "Settings",
            title: "Settings",
            items: [
              {
                id: "settings-org",
                text: "Organizational settings"
              },
              {
                id: "settings-project",
                text: "Project settings"
              }
            ]
          },
          {
            type: "menu-dropdown",
            text: "Shaistha Samreen",
            description: "shaisthasamreen786@gmail.com",
            iconName: "user-profile",
            items: [
              { id: "profile", text: "Profile" },
              { id: "preferences", text: "Preferences" },
              { id: "security", text: "Security" },
              {
                id: "support-group",
                text: "Support",
                items: [
                  {
                    id: "documentation",
                    text: "Documentation",
                    href: "#",
                    external: true,
                    externalIconAriaLabel:
                      " (opens in new tab)"
                  },
                  { id: "support", text: "Support" },
                  {
                    id: "feedback",
                    text: "Feedback",
                    href: "#",
                    external: true,
                    externalIconAriaLabel:
                      " (opens in new tab)"
                  }
                ]
              },
              { id: "signout", text: "Sign out" }
            ]
          }
        ]}
        search={
          <Input
            type="search"
            placeholder="Search"
            ariaLabel="Search"
          />
        }
      />
    </div>
  );
};

export default TopBar;
