import { useCallback, useEffect, useState } from "react";

import { Sentry, ToolbarConfigService } from "@/services";
import type { FormattingTool, ToolbarConfig } from "@/types";

import useUserAccent from "../use-user-accent";

export default function useToolbarConfig() {
  const { accent } = useUserAccent();
  const [config, setConfig] = useState<ToolbarConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial config
  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true);
        const loadedConfig = await ToolbarConfigService.loadConfig(accent);
        setConfig(loadedConfig);
      } catch {
        // Fallback to default config
        const defaultConfig = ToolbarConfigService.getDefaultConfig(accent);
        setConfig(defaultConfig);
      } finally {
        setIsLoading(false);
      }
    };

    void loadConfig();
  }, [accent]);

  // Update config when user accent changes
  useEffect(() => {
    if (config && !isLoading) {
      const updateTheme = async () => {
        try {
          const updatedConfig = await ToolbarConfigService.updateConfig(
            { theme: ToolbarConfigService.getDefaultConfig(accent).theme },
            accent
          );
          setConfig(updatedConfig);
        } catch (error) {
          Sentry.captureException(error);
        }
      };

      void updateTheme();
    }
  }, [accent, config, isLoading]);

  const updateConfig = useCallback(
    async (updates: Partial<ToolbarConfig>) => {
      if (!config) return;

      try {
        const updatedConfig = await ToolbarConfigService.updateConfig(
          updates,
          accent
        );
        setConfig(updatedConfig);
        return updatedConfig;
      } catch (error) {
        throw error;
      }
    },
    [config, accent]
  );

  const isToolEnabled = useCallback(
    (tool: FormattingTool): boolean => {
      return config?.enabledTools.includes(tool) ?? false;
    },
    [config]
  );

  const enableTool = useCallback(
    async (tool: FormattingTool) => {
      if (!config) return;

      try {
        const updatedConfig = await ToolbarConfigService.enableTool(
          tool,
          accent
        );
        setConfig(updatedConfig);
        return updatedConfig;
      } catch (error) {
        throw error;
      }
    },
    [config, accent]
  );

  const disableTool = useCallback(
    async (tool: FormattingTool) => {
      if (!config) return;

      try {
        const updatedConfig = await ToolbarConfigService.disableTool(
          tool,
          accent
        );
        setConfig(updatedConfig);
        return updatedConfig;
      } catch (error) {
        throw error;
      }
    },
    [config, accent]
  );

  const resetToDefaults = useCallback(async () => {
    try {
      const defaultConfig = await ToolbarConfigService.resetToDefaults(accent);
      setConfig(defaultConfig);
      return defaultConfig;
    } catch (error) {
      throw error;
    }
  }, [accent]);

  return {
    resetToDefaults,
    isToolEnabled,
    updateConfig,
    disableTool,
    enableTool,
    isLoading,
    config,
  };
}
