import { AsyncStorage, storage } from "@/services";
import type {
  FormattingTool,
  ToolbarConfig,
  ToolbarTheme,
  UserAccentValue,
} from "@/types";

const TOOLBAR_CONFIG_KEY = "toolbar.config";

const DEFAULT_ENABLED_TOOLS: FormattingTool[] = [
  "bold",
  "italic",
  "underline",
  "heading1",
  "heading2",
  "bulletList",
  "numberedList",
];

const DEFAULT_ANIMATION_DURATION = 250;

export const ToolbarConfigService = {
  loadConfig: async (
    userAccent: UserAccentValue = "pink10"
  ): Promise<ToolbarConfig> => {
    try {
      const configJson = await AsyncStorage.getItem(TOOLBAR_CONFIG_KEY);
      if (!configJson) {
        return ToolbarConfigService.getDefaultConfig(userAccent);
      }

      const savedConfig = JSON.parse(configJson) as Partial<ToolbarConfig>;
      const defaultConfig = ToolbarConfigService.getDefaultConfig(userAccent);

      // Merge saved config with defaults, ensuring theme is updated with current accent
      return {
        ...defaultConfig,
        ...savedConfig,
        theme: createToolbarTheme(userAccent), // Always use current user accent
      };
    } catch {
      return ToolbarConfigService.getDefaultConfig(userAccent);
    }
  },

  updateConfig: async (
    updates: Partial<ToolbarConfig>,
    userAccent: UserAccentValue = "pink10"
  ): Promise<ToolbarConfig> => {
    const currentConfig = await ToolbarConfigService.loadConfig(userAccent);
    const updatedConfig: ToolbarConfig = {
      ...currentConfig,
      ...updates,
    };

    await ToolbarConfigService.saveConfig(updatedConfig);
    return updatedConfig;
  },

  enableTool: async (
    tool: FormattingTool,
    userAccent: UserAccentValue = "pink10"
  ): Promise<ToolbarConfig> => {
    const config = await ToolbarConfigService.loadConfig(userAccent);
    if (!config.enabledTools.includes(tool)) {
      config.enabledTools.push(tool);
      await ToolbarConfigService.saveConfig(config);
    }
    return config;
  },

  disableTool: async (
    tool: FormattingTool,
    userAccent: UserAccentValue = "pink10"
  ): Promise<ToolbarConfig> => {
    const config = await ToolbarConfigService.loadConfig(userAccent);
    config.enabledTools = config.enabledTools.filter((t) => t !== tool);
    await ToolbarConfigService.saveConfig(config);
    return config;
  },

  getDefaultConfig: (userAccent: UserAccentValue = "pink10"): ToolbarConfig => {
    const theme = createToolbarTheme(userAccent);

    return {
      animationDuration: DEFAULT_ANIMATION_DURATION,
      enabledTools: DEFAULT_ENABLED_TOOLS,
      position: "above-keyboard",
      theme,
    };
  },

  resetToDefaults: async (
    userAccent: UserAccentValue = "pink10"
  ): Promise<ToolbarConfig> => {
    const defaultConfig = ToolbarConfigService.getDefaultConfig(userAccent);
    await ToolbarConfigService.saveConfig(defaultConfig);
    return defaultConfig;
  },

  saveConfig: async (config: ToolbarConfig): Promise<void> => {
    try {
      const configJson = JSON.stringify(config);
      storage.set(TOOLBAR_CONFIG_KEY, configJson);
      await Promise.resolve();
    } catch (error) {
      throw error;
    }
  },

  isToolEnabled: async (
    tool: FormattingTool,
    userAccent: UserAccentValue = "pink10"
  ): Promise<boolean> => {
    const config = await ToolbarConfigService.loadConfig(userAccent);
    return config.enabledTools.includes(tool);
  },
};

function createToolbarTheme(userAccent: UserAccentValue): ToolbarTheme {
  // Map user accent colors to toolbar theme colors
  // These will integrate with the existing Tamagui theme system
  const accentColorMap: Record<UserAccentValue, string> = {
    orange10: "$orange10",
    purple10: "$purple10",
    yellow10: "$yellow10",
    green10: "$green10",
    blue10: "$blue10",
    gray10: "$gray10",
    pink10: "$pink10",
    red10: "$red10",
  };

  return {
    activeButtonColor: accentColorMap[userAccent],
    backgroundColor: "$background",
    buttonColor: "$color",
    iconColor: "$color",
  };
}
